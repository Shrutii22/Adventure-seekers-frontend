import API from "./api";

export const groupService = {
  // Create a new group
  createGroup: async (groupData) => {
    try {
      const response = await API.post("/groups/create", groupData);
      return response.data;
    } catch (error) {
      console.error("Error creating group:", error);
      throw error;
    }
  },

  // Get all groups for current user
  getUserGroups: async () => {
    try {
      const response = await API.get("/groups/my-groups");
      return response.data;
    } catch (error) {
      console.error("Error fetching groups:", error);
      throw error;
    }
  },

  // Get group details
  getGroupDetails: async (groupId) => {
    try {
      const response = await API.get(`/groups/${groupId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching group details:", error);
      throw error;
    }
  },

  // Add member to group
  addMember: async (groupId, userId) => {
    try {
      const response = await API.post("/groups/add-member", {
        groupId,
        userId
      });
      return response.data;
    } catch (error) {
      console.error("Error adding member:", error);
      throw error;
    }
  },

  // Remove member from group
  removeMember: async (groupId, userId) => {
    try {
      const response = await API.post("/groups/remove-member", {
        groupId,
        userId
      });
      return response.data;
    } catch (error) {
      console.error("Error removing member:", error);
      throw error;
    }
  },

  // Get group messages
  getGroupMessages: async (groupId, limit = 50, skip = 0) => {
    try {
      const response = await API.get(
        `/groups/${groupId}/messages?limit=${limit}&skip=${skip}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  // Save message to group
  saveGroupMessage: async (groupId, message) => {
    try {
      const response = await API.post("/groups/save-message", {
        groupId,
        message
      });
      return response.data;
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  },

  // Delete group
  deleteGroup: async (groupId) => {
    try {
      const response = await API.delete(`/groups/${groupId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting group:", error);
      throw error;
    }
  }
};
