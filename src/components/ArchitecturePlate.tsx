import type { ArchitectureSpec } from '../data/types';
import styles from './ArchitecturePlate.module.css';

interface ArchitecturePlateProps {
  projectIndex?: string;
  projectTitle: string;
  architecture: ArchitectureSpec;
  variant?: 'card' | 'detail';
  footerNote?: string;
}

/**
 * Editorial system architecture schematic used as the primary visual for
 * confidential enterprise systems and as supporting technical context inside case studies.
 */
export function ArchitecturePlate({
  projectIndex,
  projectTitle,
  architecture,
  variant = 'card',
  footerNote,
}: ArchitecturePlateProps) {
  const { nodes, caption, diagramType } = architecture;
  const noteText = variant === 'detail' ? caption : footerNote;

  return (
    <div
      className={`${styles.plate} ${variant === 'detail' ? styles.detail : styles.card}`}
      role="img"
      aria-label={`System architecture overview for ${projectTitle}: ${nodes
        .map((n) => n.label)
        .join(' to ')}`}
    >
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className={styles.topBar} aria-hidden="true">
        <span className={styles.plateTag}>
          {projectIndex ? `ARCH // ${projectIndex}` : 'ARCHITECTURE OVERVIEW'}
        </span>
        <span className={styles.plateType}>
          {diagramType === 'pipeline'
            ? 'FLOW PIPELINE'
            : diagramType === 'hub'
              ? 'SYSTEM HUB'
              : 'LAYERED ARCH'}
        </span>
      </div>

      <div className={styles.nodesGrid} aria-hidden="true">
        {nodes.map((node, idx) => (
          <div key={node.label} className={styles.nodeWrap}>
            <div
              className={`${styles.node} ${node.accent ? styles.nodeAccent : ''}`}
            >
              <div className={styles.nodeHeader}>
                <span className={styles.nodeNum}>0{idx + 1}</span>
                <span className={styles.nodeLabel}>{node.label}</span>
              </div>
              <p className={styles.nodeDetail}>{node.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {noteText && <p className={styles.caption}>{noteText}</p>}
    </div>
  );
}
