const createUserPayload = (user) => ({
  name: user.name,
  userId: user._id,
  role: user.role,
  email: user.email,
  organizer: user.organizer,
});

module.exports = createUserPayload;
