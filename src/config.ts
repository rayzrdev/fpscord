export interface BotConfig {
    token: string
    prefix: string
}

// Super fancy config loader/validator
export function loadConfig(): BotConfig {
    const token = process.env.BOT_TOKEN

    // If there isn't a token, the bot won't start, but if there is then
    // we want to make sure it's a valid bot token
    if (!token) {
        console.error('Missing BOT_TOKEN environment variable')
        process.exit(1)
    }

    if (!/^[a-zA-Z0-9_.-]{59}$/.test(token)) {
        console.error('Invalid bot token!')
        process.exit(1)
    }

    const prefix = process.env.BOT_PREFIX

    if (!prefix) {
        console.error('Missing BOT_PREFIX environment variable')
        process.exit(1)
    }

    return { token, prefix }
}

