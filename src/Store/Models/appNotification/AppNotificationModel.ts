export interface AppNotificationModel {
  message: string;
  severity: "info" | "error" | "warning" | "success";
  isOpen?: boolean;
}
