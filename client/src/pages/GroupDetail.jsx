import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { groupService } from "../services/groupService";
import { userService } from "../services/userService";
import GroupChat from "../components/GroupChat";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [addingMember, setAddingMember] = useState(false);

  useEffect(() => {
    fetchGroupDetails();
  }, [groupId]);

  useEffect(() => {
    if (showAddMember) {
      fetchAvailableUsers();
    }
  }, [showAddMember, group]);

  const fetchGroupDetails = async () => {
    try {
      setLoading(true);
      const result = await groupService.getGroupDetails(groupId);
      if (result.success) {
        setGroup(result.group);
      }
    } catch (error) {
      setError("Failed to load group details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableUsers = async () => {
    try {
      const result = await userService.getAllUsers();
      if (result.success) {
        setAllUsers(result.users || result);
      } else {
        setAllUsers(result);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddMessage = async (message) => {
    try {
      const result = await groupService.saveGroupMessage(groupId, message);
      if (result.success) {
        return result.message;
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!window.confirm("Remove this member from the group?")) return;

    try {
      const result = await groupService.removeMember(groupId, memberId);
      if (result.success) {
        setGroup(result.group);
      }
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleAddMember = async () => {
    if (!selectedUserId) {
      alert("Please select a user to add");
      return;
    }

    setAddingMember(true);
    try {
      const result = await groupService.addMember(groupId, selectedUserId);
      if (result.success) {
        setGroup(result.group);
        setSelectedUserId("");
        alert("Member added successfully!");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      alert(error.response?.data?.message || "Failed to add member");
    } finally {
      setAddingMember(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!window.confirm("Delete this group permanently?")) return;

    try {
      const result = await groupService.deleteGroup(groupId);
      if (result.success) {
        navigate("/groups");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  // Get users not in the group
  const usersNotInGroup = Array.isArray(allUsers)
    ? allUsers.filter(
        (u) => !group?.members.some((m) => m._id === u._id)
      )
    : [];

  const isGroupAdmin = group && group.admins.some((admin) => admin._id === user?.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-600">Loading group details...</div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error || "Group not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{group.name}</h1>
              <p className="text-slate-600 mt-2">{group.description}</p>
              <p className="text-sm text-slate-500 mt-2">
                Created by {group.createdBy.name} • {group.members.length} members
              </p>
            </div>
            {isGroupAdmin && (
              <button
                onClick={handleDeleteGroup}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete Group
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Group Chat</h2>
              <GroupChat
                groupId={groupId}
                user={user}
                onNewMessage={handleAddMessage}
              />
            </div>
          </div>

          {/* Members Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-900">Members ({group.members.length})</h2>
                {isGroupAdmin && (
                  <button
                    onClick={() => setShowAddMember(!showAddMember)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium bg-indigo-50 px-3 py-1 rounded-lg"
                  >
                    {showAddMember ? "- Close" : "+ Add"}
                  </button>
                )}
              </div>

              {showAddMember && isGroupAdmin && (
                <div className="mb-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select user to add:
                  </label>
                  <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">-- Choose a user --</option>
                    {usersNotInGroup.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                  {usersNotInGroup.length === 0 && (
                    <p className="text-xs text-slate-600 mb-3">
                      All available users are already in the group.
                    </p>
                  )}
                  <button
                    onClick={handleAddMember}
                    disabled={!selectedUserId || addingMember}
                    className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:bg-slate-400 transition"
                  >
                    {addingMember ? "Adding..." : "Add Member"}
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {group.members.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {member.name}
                          {member._id === user?.id && (
                            <span className="text-xs ml-2 text-indigo-600">(You)</span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{member.email}</p>
                        {group.admins.some((admin) => admin._id === member._id) && (
                          <p className="text-xs text-amber-600 font-semibold">Admin</p>
                        )}
                      </div>
                    </div>
                    {isGroupAdmin && member._id !== group.createdBy._id && (
                      <button
                        onClick={() => handleRemoveMember(member._id)}
                        className="text-red-600 hover:text-red-700 text-xs font-medium ml-2 hover:bg-red-50 px-2 py-1 rounded transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
