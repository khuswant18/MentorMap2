import {create} from "zustand"
import api from "@/lib/api";


const useCollegeStore = create((set, get) => ({
  colleges: [],
  loading: false,
  error: null,
  fetched: false, // Track if we've already fetched
  fetchColleges: async (force = false) => {
    const { loading, colleges } = get();
    // Skip if loading, or if we already have data (unless forced)
    if (loading || (!force && colleges.length > 0)) return; 
    
    set({ loading: true, error: null });
    try {
      const res = await api.get('/student/colleges');
      set({ colleges: res.data, loading: false, fetched: true });
    } catch (err) {
      console.error('Failed to load colleges:', err);
      set({ error: 'Failed to load colleges', loading: false, fetched: true });
    }
  },
  resetStore: () => {
    set({ colleges: [], loading: false, error: null, fetched: false });
  },
}));

export default useCollegeStore 