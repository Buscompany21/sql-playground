import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Wand2, Loader2 } from 'lucide-react';

const QueryResultsTable = ({ results, error, isExecuting }) => {
  const renderContent = () => {
    if (isExecuting) {
      return (
        <div className="text-center p-4">
          <Loader2 className="h-8 w-8 text-purple-600 animate-spin mx-auto mb-2" />
          <p className="text-purple-600 font-medium">Casting spell... ✨</p>
          <p className="text-sm text-purple-500">Your magical query is being executed</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="font-medium">SQL Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      );
    }

    if (!results || results.length === 0) {
      return (
        <div className="text-center p-4 text-purple-600">
          No results to display yet. Cast your SQL spell! ✨
        </div>
      );
    }

    const columns = Object.keys(results[0]);

    return (
      <>
        <ScrollArea className="h-[calc(100vh-400px)] rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-100 hover:bg-purple-100">
                {columns.map((column) => (
                  <TableHead 
                    key={column}
                    className="text-purple-900 font-semibold"
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
                  className="hover:bg-pink-100 transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={`${rowIndex}-${column}`}
                      className="text-purple-800"
                    >
                      {row[column]?.toString() ?? 'NULL'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="mt-2 text-sm text-purple-600">
          {results.length} {results.length === 1 ? 'row' : 'rows'} returned
        </div>
      </>
    );
  };

  return (
    <Card className="bg-pink-50 rounded-lg border-2 border-pink-200 shadow-inner">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-purple-600 mb-2 flex items-center">
          <Wand2 className="mr-2 text-pink-500" />
          Magical Results ✨
        </h3>
        {renderContent()}
      </div>
    </Card>
  );
};

export default QueryResultsTable;