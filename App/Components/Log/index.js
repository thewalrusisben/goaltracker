import React, { Component } from 'react'
import axios from 'axios'
import LogComponent from './Log'
import { storeNewWorkout, getUnprocessedWorkouts, updateWorkoutState, getAllWorkouts } from '../../lib/models'


class Log extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: this.props.navigation.state.params.fbUserId
    }
    this.logWorkout = this.logWorkout.bind(this)
    this.postWorkoutsToApi = this.postWorkoutsToApi.bind(this)
  }
  static navigationOptions = {
    header: null
  }

  logWorkout (status, title = 'flaaah', description = 'whoooa', userId = this.state.userId) {
    const now = Number(Math.round(+new Date() / 1000)) // Current timestamp in seconds, as Number
    console.log(now)
    storeNewWorkout(title, description, userId, status, 'NEW', now)
    .then((id) => {
      this.postWorkoutsToApi([{
        id,
        userId,
        title,
        description,
        status,
        created: now,
        updated: now
      }])
    })
    .catch((error) => {
      console.log('Error writing values to database.', error)
    })
  }

  postWorkoutsToApi (workouts) {
    workouts.forEach((workout) => {
      const { id, userId, title, description, status, created, updated } = workout
      axios.post(`http://192.168.0.6:8081/workouts/workout/new`, {
        userId,
        title,
        description,
        status,
        created,
        updated
      })
      .then((response) => {
        updateWorkoutState(id)
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
      })
      .catch((error) => {
        console.log('error communicating with api')
      })
    })

  }

  componentWillMount () {
    console.log('will mount')
    getUnprocessedWorkouts(this.state.userId)
    .then((workouts) => {
      this.postWorkoutsToApi(workouts)
    })
  }

  componentDidMount () {
    getAllWorkouts()
    .then((data) => {
      console.log('all', data)
    })
  }

  render () {
    return (
      <LogComponent
        logWorkout={this.logWorkout}
      />
    )
  }
}

export default Log
