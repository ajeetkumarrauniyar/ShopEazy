import { syncService } from '@/services/syncService';
import { useNetworkStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NetworkStatusProps {
  style?: any;
  showSyncButton?: boolean;
  compact?: boolean;
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({ 
  style, 
  showSyncButton = true, 
  compact = false 
}) => {
  const {
    isOnline,
    isSyncing,
    hasPendingOperations,
    pendingOperationsCount,
    lastSyncTime,
    syncError,
  } = useNetworkStore();

  const handleSync = async () => {
    if (!isOnline || isSyncing) return;
    
    try {
      await syncService.forcSync();
    } catch (error) {
      console.error('Manual sync failed:', error);
    }
  };

  const formatLastSync = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (compact) {
    return (
      <View style={[styles.compactContainer, style]}>
        <Ionicons 
          name={isOnline ? "wifi" : "wifi-outline"} 
          size={16} 
          color={isOnline ? "#34C759" : "#FF9500"} 
        />
        {hasPendingOperations() && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingBadgeText}>
              {pendingOperationsCount()}
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {/* Connection Status */}
      <View style={[styles.statusRow, isOnline ? styles.online : styles.offline]}>
        <Ionicons 
          name={isOnline ? "wifi" : "wifi-outline"} 
          size={20} 
          color={isOnline ? "#34C759" : "#FF9500"} 
        />
        <Text style={[styles.statusText, isOnline ? styles.onlineText : styles.offlineText]}>
          {isOnline ? "Online" : "Offline"}
        </Text>
        
        {/* Sync Status */}
        {isSyncing && (
          <View style={styles.syncingIndicator}>
            <Ionicons name="sync" size={16} color="#007AFF" />
            <Text style={styles.syncingText}>Syncing...</Text>
          </View>
        )}
      </View>

      {/* Pending Operations */}
      {hasPendingOperations() && (
        <View style={styles.pendingRow}>
          <Ionicons name="cloud-upload-outline" size={16} color="#FF9500" />
          <Text style={styles.pendingText}>
            {pendingOperationsCount()} operation{pendingOperationsCount() !== 1 ? 's' : ''} pending sync
          </Text>
          
          {showSyncButton && isOnline && !isSyncing && (
            <TouchableOpacity 
              style={styles.syncButton}
              onPress={handleSync}
            >
              <Ionicons name="sync" size={14} color="#007AFF" />
              <Text style={styles.syncButtonText}>Sync Now</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Last Sync Time */}
      {!isSyncing && lastSyncTime && (
        <View style={styles.lastSyncRow}>
          <Text style={styles.lastSyncText}>
            Last sync: {formatLastSync(lastSyncTime)}
          </Text>
        </View>
      )}

      {/* Sync Error */}
      {syncError && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={16} color="#FF3B30" />
          <Text style={styles.errorText}>{syncError}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  online: {
    // backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  offline: {
    // backgroundColor: 'rgba(255, 149, 0, 0.1)',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  onlineText: {
    color: '#34C759',
  },
  offlineText: {
    color: '#FF9500',
  },
  syncingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  syncingText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  pendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  pendingText: {
    fontSize: 14,
    color: '#FF9500',
    flex: 1,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  syncButtonText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  pendingBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF9500',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  lastSyncRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  lastSyncText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 59, 48, 0.2)',
    backgroundColor: 'rgba(255, 59, 48, 0.05)',
    borderRadius: 8,
    padding: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    flex: 1,
  },
}); 