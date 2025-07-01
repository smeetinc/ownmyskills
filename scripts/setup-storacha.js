// scripts/setup-storacha.js
// Run this once to set up your server agent
const Client = require('@storacha/client');
require('dotenv').config();
async function setupServer() {
    console.log('Setting up Storacha server agent...');

    const email = process.env.STORACHA_EMAIL;
    if (!email) {
        throw new Error('STORACHA_EMAIL environment variable is required');
    }

    try {
        // Create client
        const client = await Client.create();
        console.log('Client created with DID:', client.agent.did());

        // Login with email
        console.log('Logging in with email:', email);
        await client.login(email);

        console.log('✅ Login initiated! Please check your email and click the verification link.');
        console.log('After clicking the link, you can proceed with creating a space.');

        // Wait for user to verify email
        console.log('Waiting for email verification... (this may take a minute)');

        // Check if login was successful by trying to list spaces
        let attempts = 0;
        const maxAttempts = 30; // 5 minutes

        while (attempts < maxAttempts) {
            try {
                const spaces = await client.spaces();
                console.log('Email verified! Found', spaces.length, 'existing spaces.');

                let space;
                if (spaces.length > 0) {
                    space = spaces[0];
                    console.log('Using existing space:', space.did());
                } else {
                    // Create a new space
                    console.log('Creating new space...');
                    space = await client.createSpace('server-delegation-space');
                    console.log('Space created:', space.did());

                    // Set current space
                    await client.setCurrentSpace(space.did());

                    // Register the space
                    console.log('Registering space...');
                    // Note: Space registration may be automatic with newer versions
                    console.log('Space setup complete!');
                }

                console.log('✅ Server setup complete!');
                console.log('Server Agent DID:', client.agent.did());
                console.log('Space DID:', space.did());

                break;
            } catch (error) {
                if (error.message.includes('Unauthorized')) {
                    attempts++;
                    console.log(`Waiting for email verification... (${attempts}/${maxAttempts})`);
                    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
                } else {
                    throw error;
                }
            }
        }

        if (attempts >= maxAttempts) {
            console.log('❌ Email verification timeout. Please run this script again after verifying your email.');
        }

    } catch (error) {
        console.error('Setup failed:', error);
    }
}

setupServer().catch(console.error);