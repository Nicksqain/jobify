import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../models/INotifiCation";
import { RootState } from "../store/store";
import { fetchAllUserNotifications } from "../api/fetchData";

interface NotificationState {
  notifications: INotification[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

// Define an async thunk for fetching notifications
export const fetchUserNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const userId = (thunkAPI.getState() as RootState).userSlice.user?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }
      const response = await fetchAllUserNotifications(userId); // Adjust the API endpoint accordingly
      return response as INotification[];
    } catch (error: any) {
      throw error.response?.data || "Failed to fetch notifications";
    }
  }
);

// Create a slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<number>) => {
      // Assuming your Notification has an 'id' field
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.isRead = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

// Selectors
export const selectNotifications = (state: RootState) =>
  state.notificationSlice.notifications;
export const selectNotificationsLoading = (state: RootState) =>
  state.notificationSlice.loading;
export const selectError = (state: RootState) => state.notificationSlice.error;

// Export actions and reducer
export const { markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
