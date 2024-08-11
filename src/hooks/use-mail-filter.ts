import SettingsApi from '@/apis/settings';
import { Email } from '@/types';
import useSWR from 'swr';

const useMailFilter = () => {
  const { data: setting } = useSWR('SETTING', () =>
    SettingsApi.list().then((res) => res.data.setting[0])
  );

  const getLabel = (item: Email) => {
    if (!setting) {
      return '';
    }

    if (item.confidence_score < setting.confidence_threshold) {
      return 'cannot reply';
    }

    if (!item.pending) {
      return 'auto replied';
    }

    return 'manual reply';
  };

  const getLabels = (item: Email) => {
    if (setting) {
      return item.confidence_score < setting?.confidence_threshold
        ? ['Cannot Reply']
        : !item.pending
          ? ['Auto replied']
          : [];
    }
    return [];
  };

  const getMails = (mails: Email[], filter: 'cannot reply' | 'auto replied') => {
    if (setting && filter === 'cannot reply') {
      return mails.filter((item) => item.confidence_score < setting?.confidence_threshold);
    }

    if (setting && filter === 'auto replied') {
      return mails.filter(
        (item) => item.confidence_score >= setting?.confidence_threshold && !item.pending
      );
    }

    return [];
  };

  return { getLabel, getLabels, getMails };
};

export default useMailFilter;
