import {MongoClient, ObjectId} from 'mongodb';
import {Fragment} from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = props => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetups.title}</title>
        <meta name='description' content={props.meetups.description} />
      </Head>
      <MeetupDetail
        image={props.meetups.image}
        title={props.meetups.title}
        address={props.meetups.address}
        description={props.meetups.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://omar-react-course:nXL0IaXKjLEr3KE6@cluster0.fnfma80.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}})),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    'mongodb+srv://omar-react-course:nXL0IaXKjLEr3KE6@cluster0.fnfma80.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetups: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 10,
  };
}

export default MeetupDetails;
