import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../models/INotifiCation";
import { RootState } from "../store/store";
import { fetchAllUserNotifications } from "../api/fetchData";
import { markNotificationAsRead } from "../api/notificationApi";

interface NotificationState {
  notifications: INotification[];
  loading: boolean;
  error: string | undefined;
}

// Initial state
const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: undefined,
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

export const markAsReadAsync = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId: number) => {
    await markNotificationAsRead(notificationId);
    return notificationId;
  }
);

// Create a slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNotifications.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // MarkAsReadAsync
      .addCase(markAsReadAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAsReadAsync.fulfilled, (state, action) => {
        const notificationId = action.payload;
        const notification = state.notifications.find(
          (n) => n.id === notificationId
        );
        if (notification) {
          notification.isRead = true;
        }
        state.loading = false;
      })
      .addCase(markAsReadAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
