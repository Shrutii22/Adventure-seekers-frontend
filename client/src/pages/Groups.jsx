import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { groupService } from "../services/groupService";
import CreateGroupForm from "../components/CreateGroupForm";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const result = await groupService.getUserGroups();
      if (result.success) {
        setGroups(result.groups);
      }
    } catch (error) {
      setError("Failed to load groups");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupCreated = (newGroup) => {
    setGroups([newGroup, ...groups]);
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatLastMessage = (message) => {
    if (!message) return "No messages yet";
    return message.length > 50 ? message.substring(0, 50) + "..." : message;
  };

  const formatTime = (date) => {
    if (!date) return "";
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      });
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading your groups...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {showCreateForm && (
        <CreateGroupForm
          onGroupCreated={handleGroupCreated}
          onClose={() => setShowCreateForm(false)}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">My Groups</h1>
            <p className="text-slate-600 mt-2">
              Create groups, add members, and chat with your travel community
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow-md"
          >
            + Create Group
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Groups List */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <div className="text-6xl mb-4">👥</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No groups yet</h2>
            <p className="text-slate-600 mb-6">
              Create your first group to connect with other travelers
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Create Group
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <Link
                key={group._id}
                to={`/group-detail/${group._id}`}
                className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      {group.name}
                    </h3>
                    {group.description && (
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {group.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      <span>👥 {group.members.length} members</span>
                      <span>📝 {formatLastMessage(group.lastMessage)}</span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-xs text-slate-500">
                      {formatTime(group.lastMessageTime)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
