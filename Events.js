export const EVENTS = [
    {
        type: 'STAT-CHANGE',
        notification: 'You found a patch of wild berries.',
        food: 20
    },
    {
        type: 'STAT-CHANGE',
        notification: 'One of your oxen has fallen ill and died.',
        oxen: -1
    },
    {
        type: 'STAT-CHANGE',
        notification: 'You found a lost wallet on the trail.',
        money: 50
    },
    {
        type: 'STAT-CHANGE',
        notification: 'Heavy rains spoiled some of your food.',
        food: -30
    },
    {
        type: 'STAT-CHANGE',
        notification: 'A stranger, weary from their journey, joins your party.',
        crew: 1
    },
    {
        type: 'STAT-CHANGE',
        notification: 'A crew member has died of dysentery.',
        crew: -1
    },
    {
        type: 'SHOP',
        notification: 'You come across a friendly trader.'
    },
    {
        type: 'ATTACK',
        notification: 'Bandits are attacking your caravan!',
        reward: {
            money: 100
        },
        penalty: {
            money: -100
        }
    }
];

