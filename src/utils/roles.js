// Role definitions and utilities for TourneyHub
export const ROLES = {
  PLAYER: 'player',
  TEAM_MANAGER: 'team_manager',
  COACH: 'coach',
  SUPPORT: 'support',
  SUPERVISOR: 'supervisor',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
  OMAN_ESPORT_COMMITTEE: 'oman_esport_committee'
};

// Role hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
  [ROLES.PLAYER]: 1,
  [ROLES.TEAM_MANAGER]: 2,
  [ROLES.COACH]: 3,
  [ROLES.SUPPORT]: 4,
  [ROLES.SUPERVISOR]: 5,
  [ROLES.ADMIN]: 6,
  [ROLES.SUPER_ADMIN]: 7,
  [ROLES.OMAN_ESPORT_COMMITTEE]: 8
};

// Role display names
export const ROLE_DISPLAY_NAMES = {
  [ROLES.PLAYER]: 'Player',
  [ROLES.TEAM_MANAGER]: 'Team Manager',
  [ROLES.COACH]: 'Coach',
  [ROLES.SUPPORT]: 'Support',
  [ROLES.SUPERVISOR]: 'Supervisor',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.OMAN_ESPORT_COMMITTEE]: 'Oman Esport Committee'
};

// Role descriptions
export const ROLE_DESCRIPTIONS = {
  [ROLES.PLAYER]: 'Participate in tournaments and manage personal gaming profile',
  [ROLES.TEAM_MANAGER]: 'Manage team roster, registrations, and team operations',
  [ROLES.COACH]: 'Guide and train players, analyze performance and strategies',
  [ROLES.SUPPORT]: 'Provide technical support and assistance to users',
  [ROLES.SUPERVISOR]: 'Oversee operations and moderate platform activities',
  [ROLES.ADMIN]: 'Manage users, tournaments, and platform administration',
  [ROLES.SUPER_ADMIN]: 'Full system access and advanced administrative controls',
  [ROLES.OMAN_ESPORT_COMMITTEE]: 'Official oversight and governance of esports activities'
};

// Role colors for UI
export const ROLE_COLORS = {
  [ROLES.PLAYER]: 'bg-blue-500',
  [ROLES.TEAM_MANAGER]: 'bg-green-500',
  [ROLES.COACH]: 'bg-purple-500',
  [ROLES.SUPPORT]: 'bg-yellow-500',
  [ROLES.SUPERVISOR]: 'bg-orange-500',
  [ROLES.ADMIN]: 'bg-red-500',
  [ROLES.SUPER_ADMIN]: 'bg-red-700',
  [ROLES.OMAN_ESPORT_COMMITTEE]: 'bg-gradient-to-r from-red-600 to-yellow-600'
};

// Roles that can be assigned during registration (public roles)
export const PUBLIC_ROLES = [ROLES.PLAYER, ROLES.TEAM_MANAGER];

// Roles that can only be assigned by admins
export const ADMIN_ASSIGNABLE_ROLES = [
  ROLES.COACH,
  ROLES.SUPPORT,
  ROLES.SUPERVISOR,
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
  ROLES.OMAN_ESPORT_COMMITTEE
];

// Check if user has permission to access a resource
export const hasPermission = (userRole, requiredRole) => {
  if (!userRole || !requiredRole) return false;
  
  const userLevel = ROLE_HIERARCHY[userRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
  
  return userLevel >= requiredLevel;
};

// Check if user can assign a specific role
export const canAssignRole = (userRole, targetRole) => {
  if (!userRole || !targetRole) return false;
  
  // Super Admin can assign any role
  if (userRole === ROLES.SUPER_ADMIN) return true;
  
  // Admin can assign roles below Super Admin
  if (userRole === ROLES.ADMIN && targetRole !== ROLES.SUPER_ADMIN && targetRole !== ROLES.OMAN_ESPORT_COMMITTEE) {
    return true;
  }
  
  return false;
};

// Get all roles that a user can assign
export const getAssignableRoles = (userRole) => {
  if (userRole === ROLES.SUPER_ADMIN) {
    return Object.values(ROLES);
  }
  
  if (userRole === ROLES.ADMIN) {
    return Object.values(ROLES).filter(role => 
      role !== ROLES.SUPER_ADMIN && role !== ROLES.OMAN_ESPORT_COMMITTEE
    );
  }
  
  return [];
};

// Check if role requires admin approval
export const requiresAdminApproval = (role) => {
  return ADMIN_ASSIGNABLE_ROLES.includes(role);
};

// Get role badge component props
export const getRoleBadgeProps = (role) => {
  return {
    text: ROLE_DISPLAY_NAMES[role] || role,
    color: ROLE_COLORS[role] || 'bg-gray-500',
    description: ROLE_DESCRIPTIONS[role] || ''
  };
};
