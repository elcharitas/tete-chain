import { redis } from "./utils/api";
import { provider } from "./utils/ethers";
import { tete_addr, tete_abi } from "./const";

// Database Schemas
import Pool from "./schemas/Pool";
import Stake from "./schemas/Stake";

(() => {
    const contract = provider.contract(tete_addr, tete_abi, true);

    const events = { Pool, Stake };

    Object.entries(events).forEach((event, schema) =>
        contract.on(`New${event}`, (...data) => {
            redis.create(schema, data);
        })
    );
})();
