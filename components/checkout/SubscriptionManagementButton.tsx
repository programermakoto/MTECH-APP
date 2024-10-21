"use client"; // クライアントコンポーネントとして定義

import { useRouter } from "next/navigation"; // ここを変更

import { Button } from "../ui/button";

const SubscriptionManagementButton = () => {
    const router = useRouter(); // useRouterを使用

    const loadPortal = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portal`); // 相対パスを使う

            const data = await response.json();
            
            router.push(data.url);
        };

        return (
            <div>
                <Button onClick={loadPortal}>契約管理</Button>
            </div>
        );
    };

    export default SubscriptionManagementButton;
