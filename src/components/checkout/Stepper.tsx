import { cn } from "@/lib/utils"

const steps = ["Shipping", "Payment", "Review", "Confirmation"]

export default function Stepper({ step }: { step: number }) {
  return (
    <div className="flex justify-between items-center">
      {steps.map((label, index) => {
        const current = index + 1 === step
        const completed = index + 1 < step
        return (
          <div key={label} className="flex flex-col items-center w-full">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border",
                completed
                  ? "bg-green-500 text-white"
                  : current
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              )}
            >
              {completed ? "✓" : index + 1}
            </div>
            <span className="text-sm mt-2">{label}</span>
            {index < steps.length - 1 && (
              <div className="w-full h-px bg-muted mt-2 mb-2" />
            )}
          </div>
        )
      })}
    </div>
  )
}
