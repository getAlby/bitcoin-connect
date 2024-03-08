import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Introduction to Bitcoin Connect',
    Svg: require('@site/static/img/evNxze01.svg').default,
    description: (
      <>
        Bitcoin Connect simplifies Lightning wallet integration for websites, offering a seamless experience across browsers and devices. 
        No extensions required; it won the BOLT FUN Legends of Lightning vol.2 hackathon.
      </>
    ),
  },
  {
    title: 'Seamless Integration and Payment Options',
    Svg: require('@site/static/img/h9xMU901.svg').default,
    description: (
      <>
        With Bitcoin Connect, web components effortlessly link to Lightning wallets. 
        Its intuitive invoice payment UI enables easy transactions with just a line of code, supporting various payment options.
      </>
    ),
  },
  {
    title: 'Contribution Opportunities',
    Svg: require('@site/static/img/BWWPSQ01.svg').default,
    description: (
      <>
        Bitcoin Connect, victorious in the BOLT FUN Legends of Lightning vol.2 hackathon, welcomes contributions. 
        Developers can access bounties by contacting hello@getalby.com, fostering the growth of this innovative project.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
