// import { useToast } from "@/components/ui/toast";
// import {
//   Toast,
//   ToastClose,
//   ToastDescription,
//   ToastProvider,
//   ToastTitle,
//   ToastViewport,
// } from "@/components/ui/toast"; // Renamed this file to avoid circular import

// export function Toaster() {
//   const { toasts } = useToast();

//   return (
//     <ToastProvider>
//       {toasts.map(({ id, title, description, variant }) => (
//         <Toast key={id} variant={variant}>
//           <div className="grid gap-1">
//             {title && <ToastTitle>{title}</ToastTitle>}
//             {description && <ToastDescription>{description}</ToastDescription>}
//           </div>
//           <ToastClose />
//         </Toast>
//       ))}
//       <ToastViewport />
//     </ToastProvider>
//   );
// }


