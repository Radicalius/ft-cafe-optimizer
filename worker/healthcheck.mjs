 import fetch from 'node-fetch';

async function main() {
    while (true) {
        await new Promise(r => setTimeout(r, 60000));
        await fetch(`http://${process.env.HOSTNAME}/api/combos`);
    }
}

main();