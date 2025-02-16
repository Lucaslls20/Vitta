import React from 'react';
import { List } from 'react-native-paper';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/PagesBottomTabs/Profile/styles';

export interface ListItemProps {
  title: string;
  leftIcon: string;
  onPress: () => void;
  accessibilityLabel?: string;
}

interface ProfileListSectionProps {
  title: string;
  items: ListItemProps[];
}

const ProfileListSection: React.FC<ProfileListSectionProps> = ({ title, items }) => {
  return (
    <List.Section>
      <List.Subheader style={styles.listSubheader}>{title}</List.Subheader>
      {items.map((item, index) => (
        <List.Item
          key={index}
          title={item.title}
          left={() => (
            <List.Icon
              icon={item.leftIcon}
              color={COLORS.primary}
              style={styles.iconRight}
            />
          )}
          right={() => (
            <List.Icon icon="chevron-right" color={COLORS.textSecondary} />
          )}
          onPress={item.onPress}
          accessibilityLabel={item.accessibilityLabel}
          style={styles.listItem}
        />
      ))}
    </List.Section>
  );
};

export default ProfileListSection;
