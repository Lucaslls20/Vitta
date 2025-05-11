import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button, Portal, Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../View/Colors';  
import {styles} from '../../../View/HelpFeedbackScreen/styles';

export interface DialogsProps {
    ratingDialogVisible: boolean;
    hideRatingDialog: () => void;
    rating: number;
    sendRating: () => void;
    setRating: (rating: number) => void;
    dialogs: {
        error: boolean;
        success: boolean;
        contact: boolean;
        attachment: boolean;
    };
    hideErrorDialog: () => void;
    errorMessage: string;
    hideSuccessDialog: () => void;
    successMessage: string;
    hideContactDialog: () => void;
    hideAttachmentDialog: () => void;
    contactInfo: {
        title: string;
        message: string;
    };
}


const Dialogs = ({
  ratingDialogVisible,
  hideRatingDialog,
  rating,
  sendRating,
  setRating,
  dialogs,
  hideErrorDialog,
  errorMessage,
  hideSuccessDialog,
  successMessage,
  hideContactDialog,
  hideAttachmentDialog,
  contactInfo,
}: DialogsProps) => {
  const renderStar = (starNumber: any) => (
    <TouchableOpacity
      key={starNumber}
      onPress={() => setRating(starNumber)}
      style={styles.starContainer}>
      <Icon
        name={rating >= starNumber ? 'star' : 'star-outline'}
        size={36}
        color={rating >= starNumber ? COLORS.tertiary : COLORS.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <Portal>
      {/* Rating Dialog */}
      <Dialog
        visible={ratingDialogVisible}
        onDismiss={hideRatingDialog}
        style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>
          Rate your experience
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>
            How satisfied are you with Vitta?
          </Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map(renderStar)}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideRatingDialog} textColor={COLORS.textSecondary}>
            Cancel
          </Button>
          <Button
            onPress={sendRating}
            disabled={rating === 0}
            textColor={COLORS.primary}>
            Send
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog
        visible={dialogs.error}
        onDismiss={hideErrorDialog}
        style={styles.dialog}>
        <Dialog.Title style={[styles.dialogTitle, {color: COLORS.error}]}>
          Error
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>{errorMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideErrorDialog} textColor={COLORS.primary}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        visible={dialogs.success}
        onDismiss={hideSuccessDialog}
        style={styles.dialog}>
        <Dialog.Title style={[styles.dialogTitle, {color: COLORS.success}]}>
          Success
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>{successMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideSuccessDialog} textColor={COLORS.primary}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog
        visible={dialogs.contact}
        onDismiss={hideContactDialog}
        style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>
          {contactInfo.title}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>{contactInfo.message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideContactDialog} textColor={COLORS.primary}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* Attachment Dialog */}
      <Dialog
        visible={dialogs.attachment}
        onDismiss={hideAttachmentDialog}
        style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>
          {contactInfo.title}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>{contactInfo.message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideAttachmentDialog} textColor={COLORS.primary}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Dialogs;