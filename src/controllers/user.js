exports.Login = async (req, res) => {
	const user = await User.findOne({ username: req.body.username });

	if (!user) {
		return res.status(401).json({ message: "User doesn't exist" });
	}

	const isMatch = await user.comparePassword(req.body.password);

	if (!isMatch) {
		return res.status(401).json({ message: "Invalid credentials" });
	}

	const token = user.generateAuthToken();

	await user.incrementLoginCount();

	res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false });

	res.json({ message: "Login Success", status: 1 });
}