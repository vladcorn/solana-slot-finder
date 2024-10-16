import {Connection} from '@solana/web3.js';

const connection = new Connection("https://solana-mainnet.gateway.tatum.io", {
    commitment: 'confirmed',
    httpHeaders: {
        'x-api-key': import.meta.env.VITE_SOLANA_RPC_TOKEN,
    }
});

export async function getBlockTime(slot: number): Promise<number | null> {
    try {
        return await connection.getBlockTime(slot);
    } catch (e: any) {
        if (e.code === -32009) {
            console.log(`Slot ${slot} was skipped, or missing in long-term storage. Trying to get block time for slot ${slot - 5}`);
            return await connection.getBlockTime(slot - 5);
        }
        console.error(`Failed to retrieve block time for slot ${slot}`, e);

        return null;
    }
}
