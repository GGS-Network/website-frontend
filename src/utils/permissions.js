export const AccessLevels = {
  DEFAULT: 0,    // Standardbenutzer - Nur eigenes Profil
  SUPPORT: 1,    // Support - Kann Tickets lesen
  MODERATOR: 2,  // Moderator - Kann Tickets bearbeiten
  ADMIN: 3,      // Admin - Voller Zugriff außer Systemeinstellungen
  SUPERADMIN: 4  // Superadmin - Voller Zugriff inkl. Systemeinstellungen
};

export const Permissions = {
  // Profil Berechtigungen
  VIEW_OWN_PROFILE: [AccessLevels.DEFAULT, AccessLevels.SUPPORT, AccessLevels.MODERATOR, AccessLevels.ADMIN, AccessLevels.SUPERADMIN],
  EDIT_OWN_PROFILE: [AccessLevels.DEFAULT, AccessLevels.SUPPORT, AccessLevels.MODERATOR, AccessLevels.ADMIN, AccessLevels.SUPERADMIN],
  
  // Ticket Berechtigungen
  VIEW_TICKETS: [AccessLevels.SUPPORT, AccessLevels.MODERATOR, AccessLevels.ADMIN, AccessLevels.SUPERADMIN],
  EDIT_TICKETS: [AccessLevels.MODERATOR, AccessLevels.ADMIN, AccessLevels.SUPERADMIN],
  DELETE_TICKETS: [AccessLevels.ADMIN, AccessLevels.SUPERADMIN],
  
  // Benutzer Berechtigungen
  VIEW_USERS: [AccessLevels.ADMIN, AccessLevels.SUPERADMIN],
  EDIT_USERS: [AccessLevels.ADMIN, AccessLevels.SUPERADMIN],
  DELETE_USERS: [AccessLevels.SUPERADMIN],
  
  // Status Berechtigungen
  VIEW_STATUS: [AccessLevels.DEFAULT, AccessLevels.SUPPORT, AccessLevels.MODERATOR, AccessLevels.ADMIN, AccessLevels.SUPERADMIN],
  EDIT_STATUS: [AccessLevels.ADMIN, AccessLevels.SUPERADMIN],
  
  // System Berechtigungen
  EDIT_SYSTEM_SETTINGS: [AccessLevels.SUPERADMIN]
};

export function hasPermission(userLevel, permission) {
  return Permissions[permission]?.includes(userLevel) || false;
}

export function getAccessLevelName(level) {
  const names = {
    [AccessLevels.DEFAULT]: 'Benutzer',
    [AccessLevels.SUPPORT]: 'Support',
    [AccessLevels.MODERATOR]: 'Moderator',
    [AccessLevels.ADMIN]: 'Administrator',
    [AccessLevels.SUPERADMIN]: 'Superadmin'
  };
  return names[level] || 'Unbekannt';
} 