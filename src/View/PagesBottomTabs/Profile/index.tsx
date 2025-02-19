import React from 'react';
import { ScrollView } from 'react-native';
import ProfileHeader from '../../../Components/Profile/ProfileHeader';
import StatsSection, { StatItem } from '../../../Components/Profile/StatsSection';
import ActionButtons from '../../../Components/Profile/ActionButtons';
import ProfileListSection, { ListItemProps } from '../../../Components/Profile/ProfileListSection';
import LogoutButton from '../../../Components/Profile/LogoutButton';
import { styles } from './styles';
import useProfileViewModel from '../../../ViewModels/ProfileHeaderViewModel';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../App';

const Profile: React.FC = () => {
  const { user, loading } = useProfileViewModel();

  const navigation = useNavigation<NavigationProps>()

  const statsData: StatItem[] = [
    { value: '25', label: 'Workouts' },
    { value: '1.5K', label: 'Calories Today' },
    { value: '12', label: 'km' },
  ];

  const fitnessItems: ListItemProps[] = [
    {
      title: 'Workout History',
      leftIcon: 'dumbbell',
      onPress: () => console.log('Workout History'),
      accessibilityLabel: 'View workout history',
    },
    { title: 'Goals', leftIcon: 'target', onPress: () => console.log('Goals') },
    { title: 'Challenges', leftIcon: 'trophy', onPress: () => console.log('Challenges') },
  ];

  const preferencesItems: ListItemProps[] = [
    { title: 'Settings', leftIcon: 'cog', onPress: () => console.log('Settings') },
    { title: 'Favorites Recipes', leftIcon: 'heart', onPress: () => console.log('Favorite Recipes') },
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
      <ProfileHeader
        backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s"
        avatarImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s"
        name={user?.displayName || 'Usuário'}
      />

      <StatsSection stats={statsData} />

      <ActionButtons
        onEditProfile={() => navigation.navigate('EditProfile')}
        onShare={() => console.log('Share Achievements')}
      />

      <ProfileListSection title="Fitness" items={fitnessItems} />

      <ProfileListSection title="Preferences" items={preferencesItems} />

      <ProfileListSection title="Legal & Support" items={legalItems} />

      <LogoutButton onLogout={() => console.log('Log Out')} />
    </ScrollView>
  );
};

export default Profile;
