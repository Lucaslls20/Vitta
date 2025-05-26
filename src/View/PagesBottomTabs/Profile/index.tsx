import React from 'react';
import {ScrollView} from 'react-native';
import ProfileHeader from '../../../Components/Profile/ProfileHeader';
import StatsSection, {StatItem} from '../../../Components/Profile/StatsSection';
import ActionButtons from '../../../Components/Profile/ActionButtons';
import ProfileListSection, {
  ListItemProps,
} from '../../../Components/Profile/ProfileListSection';
import {styles} from './styles';
import useProfileViewModel from '../../../ViewModels/ProfileHeaderViewModel';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../App';
import {LogoutView} from '../../../Components/LogOut';
import useStatsViewModel from '../../../ViewModels/StatsViewModel';
import {ShareViewModel} from '../../../ViewModels/ShareViewModel';

const Profile: React.FC = () => {
  const {user, loading} = useProfileViewModel();
  const {statsData} = useStatsViewModel();
  const navigation = useNavigation<NavigationProps>();
  const appId = ' com.vitta.'; 
  const shareVM = new ShareViewModel(appId);

  const fitnessItems: ListItemProps[] = [
    {
      title: 'Goals',
      leftIcon: 'target',
      onPress: () => navigation.navigate('Goals'),
    },
    /* { title: 'Challenges', leftIcon: 'trophy', onPress: () => navigation.navigate('ChallengesScreen') }, */
  ];

  const preferencesItems: ListItemProps[] = [
    {
      title: 'Settings',
      leftIcon: 'cog',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'Favorites Recipes',
      leftIcon: 'heart',
      onPress: () => navigation.navigate('FavoriteRecipeScreen'),
    },
  ];

  const legalItems: ListItemProps[] = [
    {
      title: 'Privacy Policy',
      leftIcon: 'file-document-outline',
      onPress: () => navigation.navigate('PrivacyPolicyScreen'),
    },
    {
      title: 'Terms and Conditions',
      leftIcon: 'file-document-multiple-outline',
      onPress: () => navigation.navigate('TermsAndConditionsScreen'),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 10}}>
      <ProfileHeader
        backgroundImage="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2124-61f7-bd61-94477d3bb2a6/raw?se=2025-05-23T23%3A16%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=86969acb-b081-504f-86db-ef41501b4cb1&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T10%3A04%3A33Z&ske=2025-05-24T10%3A04%3A33Z&sks=b&skv=2024-08-04&sig=wgRnMY%2B6B9cJkS6KXajBdP/l/p%2Bq0zAUaE4HaM3Kqe8%3D"
        avatarImage="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2124-61f7-bd61-94477d3bb2a6/raw?se=2025-05-23T23%3A16%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=86969acb-b081-504f-86db-ef41501b4cb1&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T10%3A04%3A33Z&ske=2025-05-24T10%3A04%3A33Z&sks=b&skv=2024-08-04&sig=wgRnMY%2B6B9cJkS6KXajBdP/l/p%2Bq0zAUaE4HaM3Kqe8%3D"
        name={user?.displayName || 'Usuário'}
      />

      <StatsSection stats={statsData} />

      <ActionButtons onEditProfile={() => navigation.navigate('EditProfile')} 
        onShare={() => shareVM.shareApp()}
        />

      <ProfileListSection title="Fitness" items={fitnessItems} />

      <ProfileListSection title="Preferences" items={preferencesItems} />

      <ProfileListSection title="Legal & Support" items={legalItems} />

      <LogoutView />
    </ScrollView>
  );
};

export default Profile;
