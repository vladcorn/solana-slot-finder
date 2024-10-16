import {Connection} from '@solana/web3.js';

const connection = new Connection("https://solana-mainnet.gateway.tatum.io", {
    commitment: 'confirmed',
    httpHeaders: {
        'x-api-key': 't-670fb1ff9b6c1e2be72debc4-2ae19177bc1e4bbc9eca0140'
    }
});

export async function getBlockTime(slot: number): Promise<number | null> {
    try {
        return await connection.getBlockTime(slot);
    } catch (e) {
        if (e.message === `Slot ${slot} was skipped, or missing in long-term storage`) {
            console.log(`Slot ${slot} was skipped, or missing in long-term storage. Trying to get block time for slot ${slot - 5}`);
            return await connection.getBlockTime(slot - 5);
        }
        console.error(`Failed to retrieve block time for slot ${slot}`, e);

        return null;
    }
}
