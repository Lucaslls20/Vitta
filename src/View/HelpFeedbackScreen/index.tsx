import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import Header from '../../Components/HelpFeedback/Header'
import Dialogs from '../../Components/HelpFeedback/Dialog';
import HelpTab from './HelpTab';
import FeedbackTab from './FeedbackTab';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';
import {useHelpFeedbackViewModel} from '../../ViewModels/HelpFeedbackViewModel'

const HelpFeedbackScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const vm = useHelpFeedbackViewModel();
  const { activeTab, setActiveTab, ratingDialogVisible, hideRatingDialog, rating,
          sendRating, setRating, dialogs, hideErrorDialog, errorMessage,
          hideSuccessDialog, successMessage, hideContactDialog, hideAttachmentDialog,
          contactInfo } = vm;

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Divider />

      {activeTab === 'Help'
        ? <HelpTab vm={vm} />
        : <FeedbackTab vm={vm} />
      }

      <Dialogs
        ratingDialogVisible={ratingDialogVisible}
        hideRatingDialog={hideRatingDialog}
        rating={rating}
        sendRating={sendRating}
        setRating={setRating}
        dialogs={dialogs}
        hideErrorDialog={hideErrorDialog}
        errorMessage={errorMessage}
        hideSuccessDialog={hideSuccessDialog}
        successMessage={successMessage}
        hideContactDialog={hideContactDialog}
        hideAttachmentDialog={hideAttachmentDialog}
        contactInfo={contactInfo}
      />
    </View>
  );
};

export default HelpFeedbackScreen;
