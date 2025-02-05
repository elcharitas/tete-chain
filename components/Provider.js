import Head from "next/head";
import { createContext, useState, useContext } from "react";
import consts, { app_name } from "../const";

export const Context = createContext({});

/**
 *
 * @param {string[]} values
 * @returns {unknown[] | Record<string, unknown>}
 */
export function useValues(values = []) {
    const context = useContext(Context);
    return values?.length > 0 ? values.map((key) => context[key]) : context;
}

export default function Provider({ children, value }) {
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState(0);
    const [ethProvider, setProvider] = useState();
    const [network, setNetwork] = useState(null);
    const [title, setTitle] = useState(app_name);

    return (
        <Context.Provider
            value={{
                account,
                setAccount,
                balance,
                setBalance,
                ethProvider,
                setProvider,
                network,
                setNetwork,
                title,
                setTitle,
                ...consts,
                ...value,
            }}
        >
            <Head>
                <title>
                    {title} | {app_name}
                </title>
            </Head>
            {children}
        </Context.Provider>
    );
}
