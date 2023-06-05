export type StyleType = 'PAINT' | 'TEXT' | 'EFFECT' | 'GRID'
export type NodeType = 'DOCUMENT' | 'CANVAS' | 'FRAME' | 'GROUP' | 'VECTOR' | 'BOOLEAN' | 'STAR' | 'LINE' | 'ELLIPSE' | 'REGULAR_POLYGON' | 'RECTANGLE' | 'TEXT' | 'SLICE' | 'COMPONENT' | 'INSTANCE' | 'BOOLEAN_OPERATION' | 'VECTOR_NETWORK' | 'STICKY' | 'FRAME' | 'TABLE' | 'TABLE_CELL' | 'COMPONENT_SET' | 'SHAPE_WITH_TEXT' | 'CONNECTOR'
export type BlendMode = 'PASS_THROUGH' | 'NORMAL' | 'DARKEN' | 'MULTIPLY' | 'LINEAR_BURN' | 'COLOR_BURN' | 'LIGHTEN' | 'SCREEN' | 'LINEAR_DODGE' | 'COLOR_DODGE' | 'OVERLAY' | 'SOFT_LIGHT' | 'HARD_LIGHT' | 'DIFFERENCE' | 'EXCLUSION' | 'HUE' | 'SATURATION' | 'COLOR' | 'LUMINOSITY'
export type LineType = 'ORDERED' | 'UNORDERED' | 'NONE'
export type LayoutConstraint = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' | 'CENTER' | 'TOP_BOTTOM' | 'LEFT_RIGHT' | 'SCALE' | 'HEIGHT' | 'WIDTH'
export type LayoutAlign = 'INHERIT' | 'STRETCH' | 'MIN' | 'CENTER' | 'MAX'
export type EasingType = 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT' | 'LINEAR' | 'GENTLE_SPRING'
export type ComponentPropertyType = 'BOOLEAN' | 'INSTANCE_SWAP' | 'TEXT' | 'VARIANT'
export type ShapeType = 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
export type ConnectorLineType = 'STRAIGHT' | 'ELBOW'

export type Transform = Array<number[]>

export interface User {
    id: string
    handle: string
    img_url: string
    email: string | undefined
}

export interface Style {
    key: string
    file_key: string
    node_id: string
    style_type: StyleType
    thumnail_url: string
    name: string
    description: string
    created_at: string
    updated_at: string
    user: User
    sort_position: string
}

export interface Color {
    r: number
    g: number
    b: number
    a: number
}

export interface StrokeWeights {
    top: number
    right: number
    bottom: number
    left: number
}

export interface ArcData {
    startingAngle: number
    endingAngle: number
    innerRadius: number
}

export interface LayoutGrid {
    pattern: 'COLUMNS' | 'ROWS' | 'GRID'
    sectionSize: number
    visible: boolean
    color: Color
    alignment: 'MIN' | 'MAX' | 'CENTER'
    gutterSize: number
    offset: number
    count: number
}

export interface Vector {
    x: number
    y: number
}

export interface Rectangle {
    x: number
    y: number
    width: number
    height: number
}

export interface Constraint {
    type: 'SCALE' | 'WIDTH' | 'HEIGHT'
    value: number
}

export interface ColorStop {
    position: number
    color: Color
}

export interface ExportSetting {
    suffix: string
    format: string
    constraint: Constraint
}

export interface Hyperlink {
    type: 'URL' | 'NODE'
    url: string
    nodeID: string
}

export interface ImageFilters {
    exposure: number
    contrast: number
    saturation: number
    temperature: number
    tint: number
    highlights: number
    shadows: number
}

export interface Overrides {
    id: string,
    overriddenFields: string[]
}

export interface InstanceSwapPreferredValue {
    type: 'COMPONENT' | 'COMPONENT_SET'
    key: string
}

export interface ComponentPropertyDefinition {
    type: ComponentPropertyType,
    defaultValue: boolean | string
    variantOptions?: string[]
    preferredValues?: InstanceSwapPreferredValue[]
}

export interface ComponentProperty {
    type: ComponentPropertyType
    value: boolean | string
    preferredValue?: InstanceSwapPreferredValue[]
}

export interface ConnectorEndpoint {
    endpointNodeId: string
    position: Vector
    magnet: 'AUTO' | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'
}

export interface ConnectorTextBackground {
    cornerRadius: number
    fills: Paint[]
}

export interface Effect {
    type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR'
    visible: boolean
    radius: number
    color: Color
    blendMode: BlendMode
    offset: Vector
    spread: number
    showShadowBehindNode: boolean
}

export interface Paint {
    type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE' | 'EMOJI' | 'VIDEO'
    visible: boolean
    opacity: number
    color: Color
    blendMode: BlendMode
    gradientHandlePositions: Vector[]
    gradientStops: ColorStop[]
    scaleMode: 'FILL' | 'FIT' | 'TILE' | 'STRETCH'
    imageTransform: Transform
    scalingFactor: number
    rotation: number
    imageRef: string
    filters: ImageFilters
    gifRef: string
}

export interface PaintOverride {
    fills: Paint[]
    inheritFillStyleId: string
}

export interface TypeStyle {
    fontFamily: string
    fontPostScriptName: string
    paragraphSpacing: number
    paragraphIndent: number
    listSpacing: number
    italic: boolean
    fontWeight: number
    fontSize: number
    textCase: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE' | 'SMALL_CAPS' | 'SMALL_CAPS_FORCED'
    textDecoration: 'NONE' | 'STRIKETHROUGH' | 'UNDERLINE'
    textAutoResize: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT' | 'TRUNCATE'
    textAlignHorizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED' 
    textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM'
    letterSpacing: number
    fills: Paint[]
    hyperlink: Hyperlink
    opentypeFlags: Map<string, number>
    lineHeightPx: number
    lineHeightPercent: number
    lineHeightPercentFontSize: number
    lineHeightUnit: 'PIXELS' | 'FONT_SIZE_%' | 'INTRINSIC_%'
}

export interface StyleData {
    fontSizes: string[]
    colorHexValues: string[]
}

export interface Node {
    id: string
    name: string
    type: NodeType
}

export interface TextNode extends Node {
    characters: string
    style: TypeStyle
    characterStyleOverrides: number[]
    styleOverrideTable: Map<number, TypeStyle>
    lineTypes: LineType[]
    lineIndentations: number[]
}

export interface FrameNode extends Node {
    children: Node[]
    locked: boolean
    background: Paint[]
    backgroundColor: Color
    fills: Paint[]
    strokes: Paint[]
    strokeWeight: number
    strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER'
    strokeDashes: number[]
    cornerRadius: number
    rectangleCornerRadii: number[]
    exportSettings: ExportSetting[]
    blendMode: BlendMode
    preserveRatio: boolean
    constraints: LayoutConstraint
    layoutAlign: LayoutAlign
    transitionNodeID: string
    transitionDuration: number
    transitionEasing: EasingType
    opacity: number
    absoluteBoundingBox: Rectangle
    absoluteRenderBounds: Rectangle
    size: Vector
    relativeTransform: Transform
    clipsContent: boolean
    layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
    primaryAxisSizingMode: 'FIXED' | 'AUTO'
    counterAxisSizingMode: 'FIXED' | 'AUTO'
    primaryAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN'
    counterAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE'
    paddingLeft: number
    paddingRight: number
    paddingTop: number
    paddingBottom: number
    horizontalPadding: number
    verticalPadding: number
    itemsSpacing: number
    layoutPositioning: 'AUTO' | 'ABSOLUTE'
    itemReverseZIndex: boolean
    strokesIncludedInLayout: boolean
    layoutGrids: LayoutGrid[]
    overflowDirection: 'HORIZONTAL_SCROLLING' | 'VERTICAL_SCROLLING' | 'HORIZONTAL_AND_VERTICAL_SCROLLING' | 'NONE'
    effects: Effect[]
    isMask: boolean
    isMaskOutline: boolean
    styles: Map<StyleType, string>
}

export interface VectorNode extends Node {
    locked: boolean
    exportSettings: ExportSetting[]
    blendMode: BlendMode
    preserveRatio: boolean
    layoutAlign: string
    layoutGrow: number
    constraints: LayoutConstraint
    transitionNodeID: string
    transitionDuration: number
    transitionEasing: EasingType
    opacity: number
    absoluteBoundingBox: Rectangle
    absoluteRenderBounds: Rectangle
    effects: Effect[]
    size: Vector
    relativeTransform: Transform
    isMask: boolean
    fills: Paint[]
    fillOverrideTable: Map<number, PaintOverride>
    strokes: Paint[]
    strokeWeight: number
    individualStrokeWeights: StrokeWeights
    strokeCap: string
    strokeJoin: string
    strokeDashes: number[]
    strokeMiterAngle: number
    strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER'
    styles: Map<StyleType, string>
}

export interface BooleanOperationNode extends VectorNode {
    children: Node[]
    booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE'
}

export interface EllipseNode extends VectorNode {
    arcData: ArcData
}

export interface RectangleNode extends VectorNode {
    cornerRadius: number
    rectangleCornerRadii: number[]
}

export interface TableNode extends Node {
    absoluteBoundingBox: Rectangle
    absoluteRenderBounds: Rectangle
    blendMode: BlendMode
    children: Node[]
    constraints: LayoutConstraint
    effects: Effect[]
    exportSettings: ExportSetting[]
    relativeTransform: Transform
    size: Vector
    strokes: Paint[]
    strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER'
    strokeWeight: number
}

export interface TableCellNode extends Node {
    absoluteBoundingBox: Rectangle
    absoluteRenderBounds: Rectangle
    characters: string
    fills: Paint[]
    relativeTransform: Transform
    size: Vector
}

export interface ComponentNode extends FrameNode {
    componentPropertyDefinitions: Map<string, ComponentPropertyDefinition>
}

export interface ComponentSetNode extends FrameNode {
    componentPropertyDefinitions: Map<string, ComponentPropertyDefinition>
}

export interface InstanceNode extends FrameNode {
    componentId: string
    isExposedInstance: boolean
    exposedInstances: string[]
    componentProperties: Map<string, ComponentProperty>
    overrides: Overrides[]
}

export interface StickyNode extends Node {
    absoluteBoundingBox: Rectangle
    absoluteRenderBounds: Rectangle
    authorVisible: boolean
    backgroundColor: Color
    blendMode: BlendMode
    characters: string
    effects: Effect[]
    exportSettings: ExportSetting[]
    fills: Paint[]
    locked: boolean
    opacity: number
    relativeTransform: Transform
}

export interface ShapeWithTextNode extends Node {
    absoluteBoundingBox: Rectangle
    absoluteRenderBounds: Rectangle
    backgroundColor: Color
    blendMode: BlendMode
    characters: string
    cornerRadius: number
    rectangleCornerRadii: number[]
    effects: Effect[]
    exportSettings: ExportSetting[]
    fills: Paint[]
    isMask: boolean
    locked: boolean
    opacity: number
    shapeType: ShapeType
    strokes: Paint[]
    strokeWeight: number
    strokeCap: string
    strokeJoin: string
    strokeDashes: number[]
    strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER'
    relativeTransform: Transform
    styles: Map<StyleType, string>
}

export interface ConnectorNode extends Node {
    absoluteBoundingBox: Rectangle
    absoluteRenderBounds: Rectangle
    backgroundColor: Color
    blendMode: BlendMode
    characters: string
    connectorStart: ConnectorEndpoint
    connectorEnd: ConnectorEndpoint
    connectorStartStrokeCap: string
    connectorEndStrokeCap: string
    connectorLineType: ConnectorLineType
    cornerRadius: number
    rectangleCornerRadii: number[]
    effects: Effect[]
    exportSettings: ExportSetting[]
    fills: Paint[]
    isMask: boolean
    locked: boolean
    opacity: number
    strokes: Paint[]
    strokeWeight: number
    strokeCap: string
    strokeJoin: string
    strokeDashes: number[]
    strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER'
    textBackground: ConnectorTextBackground
    relativeTransform: Transform
    styles: Map<StyleType, string>
}

export const isTextNode = (node: Node): node is TextNode => node.type === 'TEXT'
export const isFrameNode = (node: Node): node is FrameNode => node.type === 'FRAME' || node.type === 'GROUP'
export const isVectorNode = (node: Node): node is VectorNode => node.type === 'VECTOR' || node.type === 'LINE'  || node.type === 'REGULAR_POLYGON' || node.type === 'STAR'
export const isBooleanOperationNode = (node: Node): node is BooleanOperationNode => node.type === 'BOOLEAN_OPERATION'
export const isEllipseNode = (node: Node): node is EllipseNode => node.type === 'ELLIPSE'
export const isRectangleNode = (node: Node): node is RectangleNode => node.type === 'RECTANGLE'
export const isTableNode = (node: Node): node is TableNode => node.type === 'TABLE'
export const isTableCellNode = (node: Node): node is TableCellNode => node.type === 'TABLE_CELL'
export const isComponentNode = (node: Node): node is ComponentNode => node.type === 'COMPONENT'
export const isComponentSetNode = (node: Node): node is ComponentSetNode => node.type === 'COMPONENT_SET'
export const isInstanceNode = (node: Node): node is InstanceNode => node.type === 'INSTANCE'
export const isStickyNode = (node: Node): node is StickyNode => node.type === 'STICKY'
export const isShapeWithTextNode = (node: Node): node is ShapeWithTextNode => node.type === 'SHAPE_WITH_TEXT'
export const isConnectorNode = (node: Node): node is ConnectorNode => node.type === 'CONNECTOR'