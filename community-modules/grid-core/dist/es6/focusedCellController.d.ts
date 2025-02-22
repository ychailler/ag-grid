// Type definitions for @ag-grid-community/core v22.0.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Column } from "./entities/column";
import { CellPosition } from "./entities/cellPosition";
import { RowNode } from "./entities/rowNode";
export declare class FocusedCellController {
    private eventService;
    private gridOptionsWrapper;
    private columnController;
    private columnApi;
    private gridApi;
    private focusedCellPosition;
    private init;
    clearFocusedCell(): void;
    getFocusedCell(): CellPosition;
    getFocusCellToUseAfterRefresh(): CellPosition;
    private getGridCellForDomElement;
    setFocusedCell(rowIndex: number, colKey: string | Column, floating: string | undefined, forceBrowserFocus?: boolean): void;
    isCellFocused(cellPosition: CellPosition): boolean;
    isRowNodeFocused(rowNode: RowNode): boolean;
    isAnyCellFocused(): boolean;
    isRowFocused(rowIndex: number, floating: string): boolean;
    private onCellFocused;
}
