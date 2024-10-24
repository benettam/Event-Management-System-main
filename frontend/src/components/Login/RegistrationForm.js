import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './register.css';

const RegistrationForm = (props) => {
    const [formData, setFormData] = useState({
        username: props.usernameValue || '',
        fullName: props.fullNameValue || '',
        email: props.emailValue || '',
        phone: props.phoneValue || '',
        password: props.passwordValue || '',
        repassword: '',
    });

    const [readonly, setReadOnly] = useState(false);
    const [title, setTitle] = useState("User Registration");
    const [buttonTitle, setButtonTitle] = useState("Register");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // New loading state

    useEffect(() => {
        if (props.action === "update") {
            setReadOnly(true);
            setTitle("Edit Profile");
            setButtonTitle("Update");
        }
    }, [props.action]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: undefined }); // Clear previous errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Validation
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false); // Stop loading
            return;
        }

        try {
            if (props.action === "create") {
                const res = await Axios.post('https://eventhub-t514.onrender.com/eventRoute/create-user', formData);
                if (res.status === 200) {
                    alert("User created successfully");
                    // Optionally reset form or navigate
                    setFormData({
                        username: '',
                        fullName: '',
                        email: '',
                        phone: '',
                        password: '',
                        repassword: '',
                    });
                }
            } else if (props.action === "update") {
                const userData = { ...formData, bookedEvents: props.bookedEventsValue };
                await Axios.put(`https://eventhub-t514.onrender.com/eventRoute/update-user/${props.id}`, userData);
                alert('User updated successfully');
                // Optionally reset form or navigate
            }
        } catch (error) {
            console.error('Error during operation:', error);
            alert('Operation failed. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const validateForm = (data) => {
        const errors = {};
        if (data.username.includes(' ')) {
            errors.username = 'Username should not contain spaces';
        }
        if (data.fullName.length < 3) {
            errors.fullName = 'Full Name must have at least 3 characters';
        }
        if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.email = 'Invalid email address';
        }
        if (!/^\d{10}$/.test(data.phone)) {
            errors.phone = 'Phone number should consist of 10 digits';
        }
        if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        if (data.password !== data.repassword) {
            errors.repassword = 'Passwords do not match';
        }
        return errors;
    };

    return (
        <div className="registration-container">
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        readOnly={readonly}
                    />
                    {errors.username && <span className="register-error">{errors.username}</span>}
                </div>
                <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullName && <span className="register-error">{errors.fullName}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="register-error">{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="phone">Phone No:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <span className="register-error">{errors.phone}</span>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span className="register-error">{errors.password}</span>}
                </div>
                <div>
                    <label htmlFor="repassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="repassword"
                        name="repassword"
                        value={formData.repassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.repassword && <span className="register-error">{errors.repassword}</span>}
                </div>

                <button className='button' type="submit" disabled={loading}>
                    {loading ? 'Processing...' : buttonTitle}
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
