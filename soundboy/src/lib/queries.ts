import { useCallback } from 'react';
import useSWR from 'swr';
import { supabaseClient } from './supabaseClient';
import type { Database } from '../types';

type Task = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

/**
 * Fetches all tasks visible to the current user.  Supabase RLS policies
 * ensure that only tasks the user is permitted to see are returned.
 */
export function useTasks() {
  const supabase = supabaseClient();
  const fetcher = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Task[];
  };
  const { data, error, mutate } = useSWR('tasks', fetcher);
  return {
    tasks: data,
    isLoading: !error && !data,
    isError: Boolean(error),
    mutate,
  };
}

// Export the Task and TaskInsert types for component consumers
export type { Task, TaskInsert };

/**
 * Creates a new task.  Performs an optimistic update to the SWR cache so
 * that the task appears immediately.  If the insert fails, the cache
 * reverts to its previous value.
 */
export function useCreateTask() {
  const supabase = supabaseClient();
  const { mutate } = useTasks();
  return useCallback(
    async (payload: TaskInsert) => {
      // optimistic update
      const optimisticId = crypto.randomUUID();
      const optimisticTask: Task = {
        id: optimisticId,
        user_id: payload.user_id,
        team_id: payload.team_id ?? null,
        title: payload.title,
        description: payload.description ?? null,
        status: payload.status ?? 'todo',
        priority: payload.priority ?? 'mid',
        tag: payload.tag ?? 'dev',
        due: payload.due ?? null,
        fav: payload.fav ?? false,
        assignee: payload.assignee ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      let rollback: () => void;
      await mutate(async (tasks: Task[] | undefined) => {
        const previous = tasks ?? [];
        // optimistic addition at top of list
        const optimistic = [optimisticTask, ...previous];
        // set rollback to revert if error occurs
        rollback = () => mutate(previous, false);
        return optimistic;
      }, false);
      // call insert
      const { data, error } = await supabase
        .from('tasks')
        .insert(payload)
        .select()
        .single();
      if (error) {
        rollback();
        throw error;
      }
      // replace optimistic with real one
      await mutate((tasks: Task[] | undefined) => {
        if (!tasks) return tasks;
        return tasks.map(t => (t.id === optimisticId ? data as Task : t));
      }, false);
      return data as Task;
    },
    [mutate, supabase],
  );
}

/**
 * Updates a task.  Optimistically updates the cache.
 */
export function useUpdateTask() {
  const supabase = supabaseClient();
  const { mutate } = useTasks();
  return useCallback(
    async (id: string, updates: Partial<Task>) => {
      // optimistic update
      let rollback: () => void;
      await mutate(async (tasks: Task[] | undefined) => {
        const previous = tasks ?? [];
        const updated = previous.map(t =>
          t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t
        );
        rollback = () => mutate(previous, false);
        return updated;
      }, false);
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id);
      if (error) {
        rollback();
        throw error;
      }
    },
    [mutate, supabase],
  );
}

/**
 * Deletes a task.  Optimistically removes it from the cache.
 */
export function useDeleteTask() {
  const supabase = supabaseClient();
  const { mutate } = useTasks();
  return useCallback(
    async (id: string) => {
      let rollback: () => void;
      await mutate(async (tasks: Task[] | undefined) => {
        const previous = tasks ?? [];
        const filtered = previous.filter(t => t.id !== id);
        rollback = () => mutate(previous, false);
        return filtered;
      }, false);
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      if (error) {
        rollback();
        throw error;
      }
    },
    [mutate, supabase],
  );
}

/**
 * Returns all teams the user is a member of.  Teams where the user is not
 * a member will not be returned thanks to RLS.
 */
export function useTeams() {
  const supabase = supabaseClient();
  const fetcher = async () => {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Database['public']['Tables']['teams']['Row'][];
  };
  const { data, error } = useSWR('teams', fetcher);
  return {
    teams: data,
    isLoading: !error && !data,
    isError: Boolean(error),
  };
}