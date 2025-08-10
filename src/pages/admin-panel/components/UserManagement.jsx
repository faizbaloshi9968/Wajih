import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  ROLES, 
  ROLE_DISPLAY_NAMES, 
  ROLE_DESCRIPTIONS, 
  ROLE_COLORS,
  getAssignableRoles,
  canAssignRole,
  getRoleBadgeProps 
} from '../../../utils/roles';
import Button from '../../../components/ui/Button';
import { 
  Users, 
  Edit3, 
  Shield, 
  Calendar, 
  Mail, 
  Search,
  Filter,
  MoreVertical,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';

const UserManagement = () => {
  const { currentUser, getAllUsers, updateUserRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const loadUsers = () => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
  };

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ROLE_DISPLAY_NAMES[user.role]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleRoleChange = async (user, role) => {
    if (!canAssignRole(currentUser.role, role)) {
      alert('You do not have permission to assign this role.');
      return;
    }

    setEditingUser(user);
    setNewRole(role);
    setShowConfirmDialog(true);
  };

  const confirmRoleChange = async () => {
    setLoading(true);
    try {
      const success = updateUserRole(editingUser.uid, newRole);
      if (success) {
        loadUsers(); // Reload users to reflect changes
        setShowConfirmDialog(false);
        setEditingUser(null);
        setNewRole('');
      } else {
        alert('Failed to update user role.');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('An error occurred while updating the role.');
    } finally {
      setLoading(false);
    }
  };

  const cancelRoleChange = () => {
    setShowConfirmDialog(false);
    setEditingUser(null);
    setNewRole('');
  };

  const getRoleStats = () => {
    const stats = {};
    Object.values(ROLES).forEach(role => {
      stats[role] = users.filter(user => user.role === role).length;
    });
    return stats;
  };

  const roleStats = getRoleStats();
  const assignableRoles = getAssignableRoles(currentUser.role);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400 mt-1">Manage user roles and permissions</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Users className="h-4 w-4" />
          <span>{users.length} total users</span>
        </div>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {Object.entries(roleStats).map(([role, count]) => {
          const badgeProps = getRoleBadgeProps(role);
          return (
            <div key={role} className="bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white mb-2 ${badgeProps.color}`}>
                {badgeProps.text}
              </div>
              <div className="text-2xl font-bold text-white">{count}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by email, username, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/20 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-10 pr-8 py-2 bg-black/20 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500 appearance-none"
          >
            <option value="all">All Roles</option>
            {Object.entries(ROLE_DISPLAY_NAMES).map(([role, name]) => (
              <option key={role} value={role}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/40">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredUsers.map((user) => {
                const badgeProps = getRoleBadgeProps(user.role);
                return (
                  <tr key={user.uid} className="hover:bg-black/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-medium">
                              {user.username ? user.username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.username || user.email.split('@')[0]}
                          </div>
                          <div className="text-sm text-gray-400 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${badgeProps.color}`}>
                        <Shield className="h-3 w-3 mr-1" />
                        {badgeProps.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                        <div className="h-1.5 w-1.5 bg-white rounded-full mr-1"></div>
                        {user.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user, e.target.value)}
                          disabled={!canAssignRole(currentUser.role, user.role) || user.uid === currentUser.uid}
                          className="bg-black/40 border border-gray-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {assignableRoles.map(role => (
                            <option key={role} value={role}>
                              {ROLE_DISPLAY_NAMES[role]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-300">No users found</h3>
            <p className="mt-1 text-sm text-gray-400">
              {searchTerm || roleFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No users have registered yet.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
              <h3 className="text-lg font-medium text-white">Confirm Role Change</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to change <strong>{editingUser?.email}</strong>'s role to{' '}
              <strong className="text-purple-400">{ROLE_DISPLAY_NAMES[newRole]}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={cancelRoleChange}
                disabled={loading}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={confirmRoleChange}
                loading={loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
