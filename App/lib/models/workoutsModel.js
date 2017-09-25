import React from 'react'
import Expo, { SQLite } from 'expo'
const db = SQLite.openDatabase({name: 'workouts_db'})

db.transaction(tx => {
  tx.executeSql(`
    create table if not exists workouts (
      id integer primary key not null,
      userId text,
      title text,
      description text,
      status text,
      state text,
      created integer,
      updated integer
    )`,
    null,
    (data, dude) => console.log('Successful connection made', data, dude),
    (error) => console.log('ERROR', error)
  )
})

export const getLastWorkout = (userId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM workouts WHERE userId = ? ORDER BY id DESC LIMIT 1`,
        [userId],
        (metadata, {rows: {_array}}) => resolve(_array[0]),
        (error) => reject(error)
      )
    })
  })
}

export const getAllWorkouts = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM workouts`,
        null,
        (metadata, {rows: {_array}}) => resolve(_array),
        (error) => reject(error)
      )
    })
  })
}

export const getUnprocessedWorkouts = (userId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM workouts WHERE userId = ? AND state = 'NEW'`,
        [userId],
        (metadata, {rows: {_array}}) => resolve(_array),
        (error) => reject(error)
      )
    })
  })
}

export const storeNewWorkout = (title, description, userId, status, state = 'NEW', now) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO workouts (userId, title, description, status, state, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, title, description, status, state, now, now],
        (metadata, data) => {
          console.log(metadata, data)
          resolve(data.insertId)
        },
        (error) => reject(error)
      )
    })
  })
}

export const updateWorkoutState = (workoutId) => {
  const now = Number(Math.round(+new Date() / 1000)) // Current timestamp in seconds, as Number
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE workouts SET state = 'SUCCESS', updated = ? WHERE id = ?`,
        [workoutId, now],
        (metadata, data) => resolve(data),
        (error) => reject(error)
      )
    })
  })
}
