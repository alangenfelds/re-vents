import moment from 'moment'

export const objectToArray = (object) => {
    console.log('object', object)
    if (object) {
        return Object.entries(object).map(e => console.log('e1-e0', e[1], e[0])|| Object.assign(e[1], {id: e[0]}));
    }
}

export const createNewEvent = (user, photoURL, event) => {
    event.date = moment(event.date).toDate();
    return {
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hotsPhotoURL: photoURL || '/assets/user.png',
        created: Date.now(),
        attendees: {
            [user.id]: {
                going: true,
                joinDate: Date.now(),
                photoURL: photoURL || '/assets/user.png',
                displayName: user.displayName,
                host: true
            }
        }
    }
}