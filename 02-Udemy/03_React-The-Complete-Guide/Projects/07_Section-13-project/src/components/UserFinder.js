import {Fragment, Component} from 'react';

import classes from './UserFinder.module.css';

import Users from './Users';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';
const DUMMY_USERS = [
  {id: 'u1', name: 'Max'},
  {id: 'u2', name: 'Manuel'},
  {id: 'u3', name: 'Julie'},
];

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    // Send http req
    this.setState({filteredUsers: this.context.users});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter(user =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(evt) {
    this.setState({searchTerm: evt.target.value});
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

export default UserFinder;
