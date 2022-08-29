import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

const MeetupList = ({meetups}) => {
  return (
    <ul className={classes.list}>
      {meetups.map(({id, title, image, address, description}) => (
        <MeetupItem
          key={id}
          id={id}
          image={image}
          title={title}
          address={address}
          description={description}
        />
      ))}
    </ul>
  );
};

export default MeetupList;
