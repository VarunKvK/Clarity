// pages/privacy.js

import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl mx-auto p-6 text-white">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">
                Welcome to <strong className='text-[#cf0] text-4xl'>Clarity</strong>. Your privacy is important to us, and this Privacy Policy explains how we collect, use, and protect your information. By using our app, you consent to the practices described in this policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Personal Information:</strong> When you create an account, we collect information such as your name, email address, and password.</li>
                <li><strong>Uploaded Content:</strong> We may collect and store files you upload, such as PDFs, notes, or study materials.</li>
                <li><strong>Usage Data:</strong> We collect information on how you use our app, including interactions, preferences, and access times.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Provide and maintain our app and its services.</li>
                <li>Generate personalized notes, summaries, and questions based on your uploaded materials.</li>
                <li>Improve our services, user experience, and app functionality.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
            <p className="mb-4">
                We take the security of your information seriously and implement standard security measures to protect your data. However, we cannot guarantee complete security of any information transmitted online.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Services</h2>
            <p className="mb-4">
                Our app may use third-party services (e.g., Gemini API for AI functionalities, Notion integration) that have their own privacy policies. Please review these policies to understand how your data is handled by these services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Access, update, or delete your personal information.</li>
                <li>Withdraw consent to our data collection practices.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
            <p className="mb-4">
                We may update this Privacy Policy from time to time. You will be notified of any changes, and your continued use of the app indicates your acceptance of the revised policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at <strong className='italic'>varunkrishnankv2002@gmail.com</strong>.
            </p>
        </div>
    );
};

export default PrivacyPolicy;
