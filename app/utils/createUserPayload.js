const createUserPayload = (user) => ({
  name: user.name,
  userId: user._id,
  role: user.role,
  email: user.email,
  organizer: user.organizer,
});

const createParticipantPayload = (participant) => ({
  participantId: participant._id,
  firstName: participant.firstName,
  lastName: participant.lastName,
  email: participant.email,
  role: 'participant',
});

module.exports = { createUserPayload, createParticipantPayload };
