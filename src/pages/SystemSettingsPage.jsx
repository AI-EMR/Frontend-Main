import React, { useState } from 'react';

// Mock data - replace with actual API calls
const mockSystemSettings = {
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90,
    },
    sessionTimeout: 30, // minutes
    mfaEnabled: true,
    ipRestriction: false,
    allowedIPs: '',
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: {
      enabled: true,
      timeBeforeHours: 24,
    },
    systemAlerts: true,
  },
  maintenance: {
    backupFrequency: 'daily',
    backupTime: '02:00',
    autoUpdate: true,
    maintenanceWindow: {
      day: 'sunday',
      startTime: '01:00',
      endTime: '05:00',
    },
    logRetentionDays: 90,
  },
};

const SystemSettingsPage = () => {
  const [settings, setSettings] = useState(mockSystemSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('security');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to update system settings
    setIsEditing(false);
  };

  const handleInputChange = (category, subcategory, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...(subcategory
          ? {
              [subcategory]: {
                ...prev[category][subcategory],
                [field]: value
              }
            }
          : { [field]: value })
      }
    }));
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="heading-1 text-gray-900 dark:text-white">System Settings</h1>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Edit Settings
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                {['security', 'notifications', 'maintenance'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab
                        ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6">
                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="heading-4 text-gray-900 dark:text-white mb-4">Password Policy</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="minLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Minimum Password Length
                          </label>
                          <input
                            type="number"
                            id="minLength"
                            value={settings.security.passwordPolicy.minLength}
                            onChange={(e) => handleInputChange('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                            disabled={!isEditing}
                            min="6"
                            max="32"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label htmlFor="expiryDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password Expiry (days)
                          </label>
                          <input
                            type="number"
                            id="expiryDays"
                            value={settings.security.passwordPolicy.expiryDays}
                            onChange={(e) => handleInputChange('security', 'passwordPolicy', 'expiryDays', parseInt(e.target.value))}
                            disabled={!isEditing}
                            min="0"
                            max="365"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Set to 0 for no expiry</p>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="requireUppercase"
                            checked={settings.security.passwordPolicy.requireUppercase}
                            onChange={(e) => handleInputChange('security', 'passwordPolicy', 'requireUppercase', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="requireUppercase" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Require uppercase letters
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="requireLowercase"
                            checked={settings.security.passwordPolicy.requireLowercase}
                            onChange={(e) => handleInputChange('security', 'passwordPolicy', 'requireLowercase', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="requireLowercase" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Require lowercase letters
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="requireNumbers"
                            checked={settings.security.passwordPolicy.requireNumbers}
                            onChange={(e) => handleInputChange('security', 'passwordPolicy', 'requireNumbers', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="requireNumbers" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Require numbers
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="requireSpecialChars"
                            checked={settings.security.passwordPolicy.requireSpecialChars}
                            onChange={(e) => handleInputChange('security', 'passwordPolicy', 'requireSpecialChars', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="requireSpecialChars" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Require special characters
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="heading-4 text-gray-900 dark:text-white mb-4">Session & Authentication</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Session Timeout (minutes)
                          </label>
                          <input
                            type="number"
                            id="sessionTimeout"
                            value={settings.security.sessionTimeout}
                            onChange={(e) => handleInputChange('security', null, 'sessionTimeout', parseInt(e.target.value))}
                            disabled={!isEditing}
                            min="5"
                            max="240"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="mfaEnabled"
                            checked={settings.security.mfaEnabled}
                            onChange={(e) => handleInputChange('security', null, 'mfaEnabled', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="mfaEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Enable Multi-Factor Authentication (MFA)
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="ipRestriction"
                            checked={settings.security.ipRestriction}
                            onChange={(e) => handleInputChange('security', null, 'ipRestriction', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="ipRestriction" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Enable IP Restriction
                          </label>
                        </div>

                        {settings.security.ipRestriction && (
                          <div className="sm:col-span-2">
                            <label htmlFor="allowedIPs" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Allowed IP Addresses (comma separated)
                            </label>
                            <input
                              type="text"
                              id="allowedIPs"
                              value={settings.security.allowedIPs}
                              onChange={(e) => handleInputChange('security', null, 'allowedIPs', e.target.value)}
                              disabled={!isEditing}
                              placeholder="192.168.1.1, 10.0.0.1"
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="heading-4 text-gray-900 dark:text-white mb-4">Notification Channels</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="emailNotifications"
                            checked={settings.notifications.emailNotifications}
                            onChange={(e) => handleInputChange('notifications', null, 'emailNotifications', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Enable Email Notifications
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="smsNotifications"
                            checked={settings.notifications.smsNotifications}
                            onChange={(e) => handleInputChange('notifications', null, 'smsNotifications', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Enable SMS Notifications
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="heading-4 text-gray-900 dark:text-white mb-4">Appointment Reminders</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="appointmentRemindersEnabled"
                            checked={settings.notifications.appointmentReminders.enabled}
                            onChange={(e) => handleInputChange('notifications', 'appointmentReminders', 'enabled', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="appointmentRemindersEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Send Appointment Reminders
                          </label>
                        </div>

                        {settings.notifications.appointmentReminders.enabled && (
                          <div>
                            <label htmlFor="timeBeforeHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Hours Before Appointment
                            </label>
                            <input
                              type="number"
                              id="timeBeforeHours"
                              value={settings.notifications.appointmentReminders.timeBeforeHours}
                              onChange={(e) => handleInputChange('notifications', 'appointmentReminders', 'timeBeforeHours', parseInt(e.target.value))}
                              disabled={!isEditing}
                              min="1"
                              max="72"
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="heading-4 text-gray-900 dark:text-white mb-4">System Alerts</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="systemAlerts"
                            checked={settings.notifications.systemAlerts}
                            onChange={(e) => handleInputChange('notifications', null, 'systemAlerts', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="systemAlerts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Send System Alerts to Administrators
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Maintenance Settings */}
                {activeTab === 'maintenance' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="heading-4 text-gray-900 dark:text-white mb-4">Backup Settings</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Backup Frequency
                          </label>
                          <select
                            id="backupFrequency"
                            value={settings.maintenance.backupFrequency}
                            onChange={(e) => handleInputChange('maintenance', null, 'backupFrequency', e.target.value)}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="backupTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Backup Time
                          </label>
                          <input
                            type="time"
                            id="backupTime"
                            value={settings.maintenance.backupTime}
                            onChange={(e) => handleInputChange('maintenance', null, 'backupTime', e.target.value)}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="heading-4 text-gray-900 dark:text-white mb-4">System Updates</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="autoUpdate"
                            checked={settings.maintenance.autoUpdate}
                            onChange={(e) => handleInputChange('maintenance', null, 'autoUpdate', e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label htmlFor="autoUpdate" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Enable Automatic Updates
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="heading-4 text-gray-900 dark:text-white mb-4">Maintenance Window</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div>
                          <label htmlFor="maintenanceDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Day
                          </label>
                          <select
                            id="maintenanceDay"
                            value={settings.maintenance.maintenanceWindow.day}
                            onChange={(e) => handleInputChange('maintenance', 'maintenanceWindow', 'day', e.target.value)}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="maintenanceStartTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Start Time
                          </label>
                          <input
                            type="time"
                            id="maintenanceStartTime"
                            value={settings.maintenance.maintenanceWindow.startTime}
                            onChange={(e) => handleInputChange('maintenance', 'maintenanceWindow', 'startTime', e.target.value)}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label htmlFor="maintenanceEndTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            End Time
                          </label>
                          <input
                            type="time"
                            id="maintenanceEndTime"
                            value={settings.maintenance.maintenanceWindow.endTime}
                            onChange={(e) => handleInputChange('maintenance', 'maintenanceWindow', 'endTime', e.target.value)}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="heading-4 text-gray-900 dark:text-white mb-4">Log Management</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="logRetentionDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Log Retention Period (days)
                          </label>
                          <input
                            type="number"
                            id="logRetentionDays"
                            value={settings.maintenance.logRetentionDays}
                            onChange={(e) => handleInputChange('maintenance', null, 'logRetentionDays', parseInt(e.target.value))}
                            disabled={!isEditing}
                            min="30"
                            max="365"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSettings(mockSystemSettings);
                        setIsEditing(false);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPage; 