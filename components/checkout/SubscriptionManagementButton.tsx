"use client"; // クライアントコンポーネントとして定義

import { useRouter } from "next/navigation"; // ここを変更

import { Button } from "../ui/button";

const SubscriptionManagementButton = () => {
    const router = useRouter(); // useRouterを使用

    const loadPortal = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portal`); // 相対パスを使う
            const data = await response.json();

            router.push(data.url); // URLに遷移
        } catch (error) {
            console.error("Error loading the portal:", error);
            alert("エラーが発生しました。詳細を確認してください。");
        }
    };

    return (
        <div>
            <Button onClick={loadPortal}>サブスクリプション管理</Button>
        </div>
    );
};

export default SubscriptionManagementButton;
