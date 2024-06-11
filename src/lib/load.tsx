import { lazy, Suspense } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface LazyComponentsProps {
  importComponent: () => Promise<any>;
  moduleSelector: (module: any) => any;
}

const ErrorLoadComponent = () => {
  return (
    <Alert>
      <AlertTitle>An Error Occured</AlertTitle>
      <AlertDescription>Error Import Element</AlertDescription>
    </Alert>
  )
}

const LazyComponents = ({ importComponent, moduleSelector } : LazyComponentsProps) => {
  const lazyInvoke = () => importComponent()
    .then((module) => {
      return {
        default: moduleSelector(module)
      }
    })
    .catch(() => {
      return {
        default: ErrorLoadComponent
      }
    })
  const LazyComponent = lazy(lazyInvoke)
  return (props: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export { LazyComponents };