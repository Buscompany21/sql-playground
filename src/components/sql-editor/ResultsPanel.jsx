import { Card, CardContent } from '../ui/card'
import { Monitor, Database } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

// Query results component to display SQL results or errors
function QueryResultsTable({ results, error }) {
  if (error) {
    return (
      <div className="flex items-center justify-center h-32 text-center p-4">
        <div className="bg-red-50 border-l-4 border-[#D56262] text-[#D56262] p-4 rounded w-full">
          <p className="font-medium">SQL Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <Database className="h-12 w-12 text-[#E6F2F2] mb-3" />
        <p className="text-[#5B8A9D] font-medium">No Results Yet</p>
        <p className="text-sm text-[#4E5964] mt-1">Execute a query to see results here</p>
      </div>
    )
  }

  const columns = Object.keys(results[0])

  return (
    <div className="absolute inset-0">
      <ScrollArea className="h-full">
        <div className="min-w-max">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-[#E6F2F2]">
              <TableRow className="hover:bg-[#E6F2F2]">
                {columns.map((column) => (
                  <TableHead 
                    key={column}
                    className="text-[#2A6B70] font-semibold whitespace-nowrap"
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex}
                  className="hover:bg-[#F5FAFA] transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={`${rowIndex}-${column}`}
                      className="text-[#2E3A45] whitespace-nowrap"
                    >
                      {row[column]?.toString() ?? 'NULL'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export function ResultsPanel({ results, error, isFullScreen, width }) {
  // Fullscreen version
  if (isFullScreen) {
    return (
      <div
        className="h-full border-l border-slate-200 flex flex-col bg-white overflow-hidden"
        style={{ width: width }}
      >
        <div className="p-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-[#5B8A9D]" />
            <h3 className="font-medium text-sm text-[#2E3A45]">Query Results</h3>
          </div>
          {results?.length > 0 && (
            <span className="text-xs px-1.5 py-0.5 bg-[#E6F2F2] text-[#2A6B70] rounded">
              {results.length} {results.length === 1 ? 'row' : 'rows'}
            </span>
          )}
        </div>
        
        <div className="flex-1 relative overflow-hidden">
          <QueryResultsTable results={results} error={error} />
        </div>
      </div>
    );
  }

  // Regular mode version
  return (
    <Card className="h-full bg-white shadow-sm border-slate-200 flex flex-col overflow-hidden min-h-0">
      <CardContent className="p-4 flex flex-col flex-1 overflow-hidden min-h-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-[#2E3A45] flex items-center gap-2">
            <Monitor className="h-4 w-4 text-[#5B8A9D]" />
            <span>Query Results</span>
          </h3>
          {results?.length > 0 && (
            <span className="text-xs px-2 py-1 bg-[#E6F2F2] text-[#2A6B70] rounded-full">
              {results.length} {results.length === 1 ? 'row' : 'rows'}
            </span>
          )}
        </div>
        <div className="flex-1 relative overflow-hidden min-h-0">
          <QueryResultsTable results={results} error={error} />
        </div>
      </CardContent>
    </Card>
  );
} 