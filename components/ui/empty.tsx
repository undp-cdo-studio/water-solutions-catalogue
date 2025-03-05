import { InboxIcon } from 'lucide-react'


export default function Empty() {
  return (
    <div className="text-center py-32">
      <InboxIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No solutions found</h3>
      <p className="mt-1 text-sm text-gray-500">Try resetting your filters to find similar solutions to your criteria.</p>
    </div>
  )
}
