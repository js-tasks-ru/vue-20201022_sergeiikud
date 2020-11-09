import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',
  template: `
    <div>
      <MeetupCover
        :link="coverLink"
        :title="meetup.title"/>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description" />
            <h3>Программа</h3>
            <MeetupAgenda :agenda="meetup.agenda" />
          </div>
          <div class="meetup__aside">
            <MeetupInfo
              :organizer="meetup.organizer"
              :place="meetup.place"
              :date="meetupDate"
            />
          </div>
        </div>
      </div>
    </div>`,
  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },
  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverLink() {
      return getMeetupCoverLink(this.meetup);
    },
    meetupDate() {
      return new Date(this.meetup.date);
    },
  },
};
