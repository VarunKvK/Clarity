import { BillingHistory } from "./mini_components/billing-history";
import { CurrentPlan } from "./mini_components/current-plan";
import { LogoutButton } from "./mini_components/logout-button";
import { NotionDisconnect } from "./mini_components/notion-disconnect";

export default function SettingsPage() {
  return (
    <div className="w-full bg-[#111111] text-white">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-6 mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <LogoutButton />
            <NotionDisconnect />
            <CurrentPlan />
          </div>
          <div>
            <BillingHistory />
          </div>
        </div>
      </div>
    </div>
  )
}

